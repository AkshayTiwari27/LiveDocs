'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { redirect } from 'next/navigation';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: []
    });
    
    revalidatePath('/');

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
}

export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  try {
      const room = await liveblocks.getRoom(roomId);
    
      const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    
      if(!hasAccess) {
        throw new Error('You do not have access to this document');
      }
    
      return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
}

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title
      }
    });

    // Broadcast the title change to all connected clients
    await liveblocks.broadcastEvent(roomId, { type: 'TITLE_UPDATED', title });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room: ${error}`);
  }
}

export const getDocuments = async (email: string ) => {
  try {
      const rooms = await liveblocks.getRooms({ userId: email });
    
      return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
}

export const updateDocumentAccess = async ({ roomId, email, userType, updatedBy }: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    await liveblocks.updateRoom(roomId, { 
      usersAccesses
    });
    
    const notificationId = nanoid();
    await liveblocks.triggerInboxNotification({
      userId: email,
      kind: '$documentAccess',
      subjectId: notificationId,
      activityData: {
        userType,
        title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
        updatedBy: updatedBy.name,
        avatar: updatedBy.avatar,
        email: updatedBy.email
      },
      roomId
    });
    
    await liveblocks.broadcastEvent(roomId, { type: 'ACCESS_UPDATED' });
    revalidatePath('/'); // Revalidate the dashboard for all users
    
    return parseStringify({ success: true });
  } catch (error) {
    console.log(`Error happened while updating a room access: ${error}`);
  }
}

export const removeCollaborator = async ({ roomId, email }: {roomId: string, email: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if(room.metadata.email === email) {
      throw new Error('You cannot remove yourself from the document');
    }

    await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null
      }
    });

    await liveblocks.broadcastEvent(roomId, { type: 'ACCESS_UPDATED' });
    revalidatePath('/'); // Revalidate the dashboard for all users

    return parseStringify({ success: true });
  } catch (error) {
    console.log(`Error happened while removing a collaborator: ${error}`);
  }
}

export const deleteDocument = async (roomId: string) => {
  try {
    // Broadcast the deletion event to clients currently in the room
    await liveblocks.broadcastEvent(roomId, { type: 'DOCUMENT_DELETED' });

    // Delete the room
    await liveblocks.deleteRoom(roomId);
    
    // Invalidate the cache for the dashboard page for ALL users.
    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.log(`Error happened while deleting a room: ${error}`);
  }
}