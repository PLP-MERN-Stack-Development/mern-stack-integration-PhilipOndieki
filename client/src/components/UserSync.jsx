import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { createOrGetUser } from '../services/api';

const UserSync = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          await createOrGetUser({
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            username: user.username || user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0]
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
};

export default UserSync;