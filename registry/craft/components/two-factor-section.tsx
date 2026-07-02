import { useCallback, useState } from 'react';
import Heading from '@/components/heading';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import type { TwoFactorSectionProps } from '@/pages/settings/types';

export default function TwoFactorSection(props: TwoFactorSectionProps) {
    const {
        enabled,
        qrCodeSvg = null,
        manualSetupKey = null,
        recoveryCodes = [],
        errors,
        processing,
        onEnable,
        onDisable,
        onFetchSetupData,
    } = props;

    const [open, setOpen] = useState(false);
    const errorMessages = errors ? Object.values(errors) : [];

    const fetchSetupData = useCallback(async () => {
        onFetchSetupData?.();
    }, [onFetchSetupData]);

    return (
        <section className="space-y-4 rounded-xl border p-4">
            <Heading variant="small" title="Two-factor authentication" />

            <p className="text-sm text-muted-foreground">
                {enabled
                    ? 'Your account is protected with two-factor authentication.'
                    : 'Add an extra layer of security to your account with authenticator codes.'}
            </p>

            {enabled ? (
                <Button onClick={onDisable} variant="destructive" disabled={processing}>
                    Disable 2FA
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        onEnable?.();
                        setOpen(true);
                    }}
                    disabled={processing}
                >
                    Enable 2FA
                </Button>
            )}

            <TwoFactorSetupModal
                isOpen={open}
                onClose={() => setOpen(false)}
                twoFactorEnabled={enabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                recoveryCodesList={recoveryCodes}
                clearSetupData={() => {}}
                fetchSetupData={fetchSetupData}
                errors={errorMessages}
            />
        </section>
    );
}
