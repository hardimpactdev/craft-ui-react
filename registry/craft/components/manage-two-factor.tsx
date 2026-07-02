import { Form } from "@inertiajs/react";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Heading from "@/components/heading";
import TwoFactorSetupModal from "@/components/two-factor-setup-modal";
import { Button } from "@/components/ui/button";
import { useTwoFactorAuth } from "../hooks/use-two-factor-auth";
import { disable, enable, show } from "../routes/two-factor";

export type Props = {
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    twoFactorPending?: boolean;
    continueTwoFactorSetup?: boolean;
};

export default function ManageTwoFactor(props: Props) {
    const twoFactorEnabled = props.twoFactorEnabled ?? false;
    const twoFactorPending = props.twoFactorPending ?? false;
    const continueTwoFactorSetup = props.continueTwoFactorSetup ?? false;

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    useEffect(() => {
        if (continueTwoFactorSetup && twoFactorPending) {
            setShowSetupModal(true);
        }
    }, [continueTwoFactorSetup, twoFactorPending]);

    if (!(props.canManageTwoFactor ?? false)) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Two-factor authentication"
                description="Manage your two-factor authentication settings"
            />
            {twoFactorEnabled ? (
                <div className="flex flex-col items-start justify-start space-y-4">
                    <p className="text-sm text-muted-foreground">
                        You will be prompted for a secure, random pin during login, which you can
                        retrieve from the TOTP-supported application on your phone.
                    </p>

                    <div className="relative inline">
                        <Form action={disable()}>
                            {({ processing }) => (
                                <Button variant="destructive" type="submit" disabled={processing}>
                                    Disable 2FA
                                </Button>
                            )}
                        </Form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-start justify-start space-y-4">
                    <p className="text-sm text-muted-foreground">
                        When you enable two-factor authentication, you will be prompted for a secure
                        pin during login. This pin can be retrieved from a TOTP-supported
                        application on your phone.
                    </p>

                    <div>
                        {hasSetupData ? (
                            <Button onClick={() => setShowSetupModal(true)}>
                                <ShieldCheck />
                                Continue setup
                            </Button>
                        ) : twoFactorPending ? (
                            <Form action={show()}>
                                {({ processing }) => (
                                    <Button type="submit" disabled={processing}>
                                        <ShieldCheck />
                                        Continue setup
                                    </Button>
                                )}
                            </Form>
                        ) : (
                            <Form action={enable()} onSuccess={() => setShowSetupModal(true)}>
                                {({ processing }) => (
                                    <Button type="submit" disabled={processing}>
                                        Enable 2FA
                                    </Button>
                                )}
                            </Form>
                        )}
                    </div>
                </div>
            )}

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                recoveryCodesList={recoveryCodesList}
                clearSetupData={clearSetupData}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </div>
    );
}
