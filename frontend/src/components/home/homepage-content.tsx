import React from "react";
import { EmailSubmitForm } from "@/components/email-submit";
import { ActionsPage } from "@/components/actions";
import { NegativeAlert } from "@/components/alerts/negative-alert";
import { StartButton } from "@/components/start-button";
import { WoodsVideoBackground } from "@/components/woods-video-background";
import { SeaVideoBackground } from "@/components/sea-video-background";
import { CombinedOverlay } from "@/components/combined-overlay";

interface HomePageContentProps {
    isAuthenticated: boolean;
    errors: string[];
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    startClicked: boolean;
    showEmailForm: boolean;
    startFadeOut: boolean;
    handleStartClick: () => void;
}

export const HomePageContent = ({
    isAuthenticated,
    errors,
    setErrors,
    startClicked,
    showEmailForm,
    startFadeOut,
    handleStartClick,
}: HomePageContentProps) => {
    if (isAuthenticated) {
        return (
            <div className="fade-in-form  ">
                <ActionsPage />
                <SeaVideoBackground isMuted={!startClicked} />
            </div>
        );
    }

    return (
        <>
            <div>
                {errors.length > 0 && <NegativeAlert errors={errors} />}
                <WoodsVideoBackground isMuted={!startClicked} />
                <CombinedOverlay
                    className={`${startClicked ? "zoom-effect" : ""} ${
                        startFadeOut ? "pointer-events-none" : ""
                    }`}
                    startFadeOut={startFadeOut}
                />
                {!startClicked && <StartButton onClick={handleStartClick} />}
                {showEmailForm && (
                    <div className="fade-in-form ">
                        <EmailSubmitForm onSetErrors={setErrors} />
                    </div>
                )}
            </div>
        </>
    );
};
