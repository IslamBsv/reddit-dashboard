import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
    return (
        <header className="sticky top-0 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 z-2">
            <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
       
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                            r/worldnews
                        </h1>
                    </div>
                </div>

                <div className="flex items-center">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
