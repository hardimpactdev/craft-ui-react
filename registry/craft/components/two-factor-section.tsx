import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import type { TwoFactorSectionProps } from '@/pages/settings/types';

export default function TwoFactorSection(props: TwoFactorSectionProps) {
    const {
        enabled,
        qrCodeSvg,
        manualSetupKey,
        recoveryCodes,
        confirmationRequired,
        errors,
        processing,
        onEnable,
        onConfirm,
        onDisable,
        onRegenerateCodes,
        onFetchRecoveryCodes,
        onFetchSetupData,
    } = props;

    const [open, setOpen] = useState(false);
    const [recoveryVisible, setRecoveryVisible] = useState(false);

    return (
        <section className="space-y-4 rounded-xl border p-4">
            <Heading variant="small" title="Two-factor authentication" />

            <p className="text-sm text-muted-foreground">
                {enabled
                    ? 'Your account is protected with two-factor authentication.'
                    : 'Add an extra layer of security to your account with authenticator codes.'}
            </p>

            {enabled ? (
                <div className="space-y-4">
                    <TwoFactorRecoveryCodes
                        codes={recoveryCodes}
                        visible={recoveryVisible}
                        onToggleVisibility={() => {
                            const next = !recoveryVisible;
                            setRecoveryVisible(next);

                            if (next) {
                                onFetchRecoveryCodes?.();
                            }
                        }}
                        onFetchCodes={onFetchRecoveryCodes}
                        onRegenerate={onRegenerateCodes}
                        processing={processing}
                        errors={errors}
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button onClick={() => setOpen(true)} variant="outline">
                            Configure authenticator
                        </Button>
                        <Button onClick={onDisable} variant="destructive" disabled={processing}>
                            Disable
                        </Button>
                    </div>
                </div>
            ) : (
                <Button onClick={() => setOpen(true)}>
                    Enable two-factor authentication
                </Button>
            )}

            <TwoFactorSetupModal
                open={open}
                onOpenChange={setOpen}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                confirmationRequired={confirmationRequired}
                errors={typeof errors === 'object' ? errors : undefined}
                processing={processing}
                onEnable={onEnable}
                onConfirm={onConfirm}
                onFetchSetupData={onFetchSetupData}
            />
        </section>
    );
}
