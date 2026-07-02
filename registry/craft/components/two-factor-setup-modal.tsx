import { Form } from "@inertiajs/react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircle, ScanLine } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAppearance } from "@/hooks/use-appearance";
import { OTP_MAX_LENGTH } from "@/hooks/use-two-factor-auth";
import { confirm } from "../routes/two-factor";

function GridScanIcon() {
    return (
        <div className="mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm">
            <div className="relative overflow-hidden rounded-full border border-border bg-muted p-2.5">
                <div className="absolute inset-0 grid grid-cols-5 opacity-50">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`col-${i + 1}`}
                            className="border-r border-border last:border-r-0"
                        />
                    ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-5 opacity-50">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={`row-${i + 1}`}
                            className="border-b border-border last:border-b-0"
                        />
                    ))}
                </div>
                <ScanLine className="relative z-20 size-6 text-foreground" />
            </div>
        </div>
    );
}

function TwoFactorSetupStep({
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    onConfirmed,
    errors,
}: {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    recoveryCodesList: string[];
    onConfirmed: () => void;
    errors: string[];
}) {
    const { resolvedAppearance } = useAppearance();
    const [code, setCode] = useState<string>("");
    const pinInputContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {errors?.length ? (
                <div className="w-full rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            ) : (
                <Form
                    action={confirm()}
                    className="w-full"
                    onSuccess={() => onConfirmed()}
                    resetOnError
                    resetOnSuccess
                >
                    {({
                        processing,
                        errors: formErrors,
                    }: {
                        processing: boolean;
                        errors?: { confirmTwoFactorAuthentication?: { code?: string } };
                    }) => (
                        <div className="space-y-5">
                            <div className="mx-auto flex max-w-md overflow-hidden">
                                <div className="mx-auto aspect-square w-64 rounded-lg border border-border">
                                    <div className="z-10 flex h-full w-full items-center justify-center p-5">
                                        {qrCodeSvg ? (
                                            <div
                                                className="aspect-square w-full rounded-lg bg-white p-2 [&_svg]:size-full"
                                                dangerouslySetInnerHTML={{
                                                    __html: qrCodeSvg,
                                                }}
                                                style={{
                                                    filter:
                                                        resolvedAppearance === "dark"
                                                            ? "invert(1) brightness(1.5)"
                                                            : undefined,
                                                }}
                                            />
                                        ) : (
                                            <LoaderCircle className="size-4 animate-spin" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="two-factor-secret-key"
                                    className="text-sm font-medium leading-none"
                                >
                                    Secret key
                                </label>
                                <input
                                    id="two-factor-secret-key"
                                    type="text"
                                    disabled
                                    value={manualSetupKey ?? ""}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground shadow-xs"
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium leading-none">Recovery codes</p>
                                <pre className="min-h-32 whitespace-pre-wrap rounded-md border border-border bg-muted/50 px-4 py-3 font-mono text-sm leading-7 text-foreground">
                                    {recoveryCodesList.length
                                        ? recoveryCodesList.join("\n")
                                        : "Loading recovery codes..."}
                                </pre>
                            </div>

                            <div ref={pinInputContainerRef} className="space-y-2">
                                <label htmlFor="otp" className="text-sm font-medium leading-none">
                                    Authentication code
                                </label>
                                <InputOTP
                                    id="otp"
                                    name="code"
                                    maxLength={OTP_MAX_LENGTH}
                                    onChange={setCode}
                                    disabled={processing}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    autoFocus
                                >
                                    <InputOTPGroup>
                                        {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                            <InputOTPSlot key={index} index={index} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <InputError
                                    message={formErrors?.confirmTwoFactorAuthentication?.code}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing || code.length < OTP_MAX_LENGTH}
                            >
                                Confirm 2FA
                            </Button>
                        </div>
                    )}
                </Form>
            )}
        </>
    );
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    twoFactorEnabled: boolean;
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    recoveryCodesList: string[];
    clearSetupData: () => void;
    fetchSetupData: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    twoFactorEnabled,
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    clearSetupData,
    fetchSetupData,
    errors,
}: Props) {
    const modalConfig = useMemo<{
        title: string;
        description: string;
    }>(() => {
        if (twoFactorEnabled) {
            return {
                title: "Two-factor authentication enabled",
                description: "Two-factor authentication is now enabled for your account.",
            };
        }

        return {
            title: "Set up 2FA",
            description:
                "Scan the QR code with your authenticator app, save the recovery codes, then enter the generated code to finish setup.",
        };
    }, [twoFactorEnabled]);

    const resetModalState = useCallback(() => {
        clearSetupData();
    }, [clearSetupData]);

    const handleClose = useCallback(() => {
        resetModalState();
        onClose();
    }, [onClose, resetModalState]);

    const fetchSetupDataRef = useRef(fetchSetupData);

    useEffect(() => {
        fetchSetupDataRef.current = fetchSetupData;
    }, [fetchSetupData]);

    useEffect(() => {
        if (isOpen && !qrCodeSvg) {
            fetchSetupDataRef.current();
        }
    }, [isOpen, qrCodeSvg]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex items-center justify-center">
                    <GridScanIcon />
                    <DialogTitle>{modalConfig.title}</DialogTitle>
                    <DialogDescription className="text-center">
                        {modalConfig.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-5">
                    <TwoFactorSetupStep
                        qrCodeSvg={qrCodeSvg}
                        manualSetupKey={manualSetupKey}
                        recoveryCodesList={recoveryCodesList}
                        onConfirmed={handleClose}
                        errors={errors}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
