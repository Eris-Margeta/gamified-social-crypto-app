import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useErrorHandling } from "@/hooks/error-handling";
import { HomePageContent } from "@/components/home/homepage-content";
import { MiniLayout } from "@/layouts/mini-layout";


export const HomePage = () => {
    const { isAuthenticated, isLoading } = useAuth();


    const { errors, setErrors } = useErrorHandling([]);

    const [startClicked, setStartClicked] = useState(isAuthenticated);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [startFadeOut, setStartFadeOut] = useState(isAuthenticated);

    const handleStartClick = () => {
        setStartClicked(true);
        setStartFadeOut(true);
        setShowEmailForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    
    };



    if (isLoading) {
        return <div>Loading authentication status...</div>;
    }

    return (
        <MiniLayout>
        <HomePageContent
            isAuthenticated={isAuthenticated}
            errors={errors}
            setErrors={setErrors}
            startClicked={startClicked}
            showEmailForm={showEmailForm}
            startFadeOut={startFadeOut}
            handleStartClick={handleStartClick}

        />
        </MiniLayout>  
    );
};
