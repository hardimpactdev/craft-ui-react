import { useEffect, useState } from 'react';
import { LoaderCircle, ClipboardCopy, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useClipboard } from '@/hooks/use-clipboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TwoFactorSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrCodeSvg?: string;
    manualSetupKey?: string;
    recoveryCodes?: string[];
    confirmationRequired?: boolean;
    errors?: { code?: string };
    processing?: boolean;
    onEnable?: () => void;
    onConfirm?: (code: string) => void;
    onFetchSetupData?: () => void;
}

type TwoFactorSetupMode = 'setup' | 'verify';

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    qrCodeSvg,
    manualSetupKey,
    errors,
    processing = false,
    confirmationRequired,
    onEnable,
    onConfirm,
    onFetchSetupData,
}: TwoFactorSetupModalProps) {
    const [mode, setMode] = useState<TwoFactorSetupMode>('setup');
    const [code, setCode] = useState('');
    const [copiedText, copy] = useClipboard();

    useEffect(() => {
        if (isOpen && onFetchSetupData) {
            onFetchSetupData();
        }

        if (!isOpen) {
            setCode('');
        }

        setMode(confirmationRequired ? 'verify' : 'setup');
    }, [isOpen, confirmationRequired, onFetchSetupData]);

    const handleEnable = () => {
        onEnable?.();
        setMode('verify');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onConfirm?.(code);
    };

    const handleCopySetupKey = async () => {
        if (!manualSetupKey) {
            return;
        }
        await copy(manualSetupKey);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="inline-flex items-center gap-2">
                        <QrCode className="size-4" />
                        Set up authenticator
                    </DialogTitle>
                    <DialogDescription>
                        Add the app to your authenticator and enter the confirmation code.
                    </DialogDescription>
                </DialogHeader>

                {mode === 'setup' ? (
                    <div className="space-y-4">
                        {qrCodeSvg ? (
                            <div
                                className="rounded-lg border bg-white p-3"
                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                            />
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Scan with your authenticator</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        QR code is unavailable. If you already have setup data, use the
                                        manual key below.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {manualSetupKey && (
                            <div className="space-y-2 text-sm">
                                <Label>Manual key</Label>
                                <div className="rounded-lg border p-2 font-mono">{manualSetupKey}</div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCopySetupKey}
                                >
                                    <ClipboardCopy className="mr-2 size-4" />
                                    {copiedText ? 'Copied' : 'Copy key'}
                                </Button>
                            </div>
                        )}

                        <Separator />

                        <Button onClick={handleEnable} className="w-full">
                            Continue
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="verification-code">Verification code</Label>
                            <InputOTP
                                id="verification-code"
                                maxLength={6}
                                value={code}
                                onChange={setCode}
                                disabled={processing}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <InputError message={errors?.code} />
                        </div>

                        <DialogFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing || code.length !== 6}
                            >
                                {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Confirm and enable
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
