import { useUser } from "@/hooks/useUser";

export default function Navbar() {
    const { user } = useUser();
    return (
        <div className="flex items-center justify-between h-16 border-b border-white px-6">

            <h1 className="text-lg font-semibold">
                AIRIS Prompt Lab
            </h1>

            <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-neutral-500">NST Student</p>
            </div>

        </div>
    );
}