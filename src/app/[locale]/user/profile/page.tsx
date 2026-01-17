import { UserLayout } from "@/widgets/layout/user-layout";
import { ProfileForm } from "@/features/user/profile/ui/profile-form";
import Image from "next/image";

const Profile = () => (
  <UserLayout>
    <section className="animate-fade-in mt-8 lg:mt-11.5 lg:flex items-start justify-center gap-40 lg:px-20">
      <ProfileForm />

      <div className="flex-col items-center hidden lg:flex w-full">
        <div className="flex justify-start w-full">
          <Image
            src="/images/profile-first.webp"
            alt="Profile First"
            width={400}
            height={400}
          />
        </div>
        <div className="flex justify-end w-full">
          <Image
            src="/images/profile-second.webp"
            alt="Profile Second"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  </UserLayout>
);

export default Profile;
