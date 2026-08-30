import { ProfileClient } from "@/components/dashboard/user/profile/Profileclient";
import { UserProfile, UserProfileResponse } from "@/interface/user/userProfile";
import { getUserProfile } from "@/services/features/userProfile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const profileResponse = await getUserProfile();

    if (!profileResponse.success || !profileResponse.data) {
        redirect("/auth/signin")

    }

    const user: UserProfile = profileResponse.data;

    // console.log(user);
    return (
        <main className="min-h-screen bg-[#F5F7F8] px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View and manage your personal information.
                    </p>
                </div>

                {/* Interactive profile — Client Component */}
                <ProfileClient initialUser={user} />
            </div>
        </main>
    );
}