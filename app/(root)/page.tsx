'use client'; // Required to use hooks like useRouter and useEffect

import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'; // Use client-side hook
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUnreadInboxNotificationsCount } from '@liveblocks/react/suspense';

const Home = () => {
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const [roomDocuments, setRoomDocuments] = useState<any | null>(null);
  const { count: unreadCount } = useUnreadInboxNotificationsCount();
  const [prevUnreadCount, setPrevUnreadCount] = useState(unreadCount);

  // **THE FIX:** This effect listens for changes in the notification count.
  // If a new notification arrives (e.g., you are added to a doc), it refreshes the page data.
  useEffect(() => {
    if (unreadCount > prevUnreadCount) {
      router.refresh();
    }
    setPrevUnreadCount(unreadCount);
  }, [unreadCount, prevUnreadCount, router]);
  
  // Fetch documents on the client side
  useEffect(() => {
    const fetchDocuments = async () => {
      if (clerkUser) {
        const documents = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
        setRoomDocuments(documents);
      }
    };

    fetchDocuments();
  }, [clerkUser, router]); // Re-fetch when clerkUser is available or after a refresh

  if (!clerkUser) {
    // You can show a loader here or redirect, but redirect might cause a flash
    return null; 
  }

  if (roomDocuments === null) {
    return <div>Loading documents...</div>; // Or a proper loader component
  }

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image 
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ): (
        <div className="document-list-empty">
          <Image 
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn 
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}

export default Home;