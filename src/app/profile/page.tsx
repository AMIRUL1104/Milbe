import { ProfileClient } from "@/components/dashboard/user/profile/Profileclient";
import { getUserSession } from "@/services/core/session";
import { toUserProfile } from "@/services/features/userProfile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const session = await getUserSession();

    if (!session) {
        redirect("/auth/signin")

    }

    // Profile fields now live on the Better Auth `user` document; map the
    // session user into the UserProfile shape the profile UI already expects.
    const user = toUserProfile(session);

    // console.log(user);
    return (
        <main className="min-h-screen bg-[#F5F7F8] px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        আপনার ব্যক্তিগত তথ্য দেখুন ও পরিবর্তন করুন।                    </p>
                </div>

                {/* Interactive profile — Client Component */}
                <ProfileClient initialUser={user} />
            </div>
        </main>
    );
}