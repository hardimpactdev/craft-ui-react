import { type MouseEvent, useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/use-clipboard';
import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TwoFactorRecoveryCodesProps {
    codes?: string[];
    visible?: boolean;
    processing?: boolean;
    onToggleVisibility?: () => void;
    onRegenerate?: () => void;
    onFetchCodes?: () => void;
    errors?: Record<string, string>;
}

const MASKED_CODE = '••••••••••';

export default function TwoFactorRecoveryCodes({
    codes = [],
    visible = false,
    processing = false,
    onToggleVisibility,
    onRegenerate,
    onFetchCodes,
    errors,
}: TwoFactorRecoveryCodesProps) {
    const [copiedText, copy] = useClipboard();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (visible && codes.length === 0) {
            onFetchCodes?.();
        }
    }, [visible, codes.length, onFetchCodes]);

    const outputCodes = useMemo(
        () => (hidden ? codes.map(() => MASKED_CODE) : codes),
        [codes, hidden],
    );

    const handleCopyAll = async () => {
        if (!codes.length) {
            return;
        }

        await copy(codes.join('\n'));
    };

    const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setHidden((prev) => !prev);
        onToggleVisibility?.();
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                    <CardTitle>Recovery codes</CardTitle>
                    <CardDescription>Keep these codes in a safe place</CardDescription>
                </div>

                <Button size="sm" variant="outline" onClick={handleToggle}>
                    {hidden ? <Eye className="mr-2 size-4" /> : <EyeOff className="mr-2 size-4" />}
                    {visible ? (hidden ? 'Show codes' : 'Hide codes') : 'Show codes'}
                </Button>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2 rounded-lg border p-3 text-sm sm:grid-cols-2">
                    {outputCodes.length > 0 ? (
                        outputCodes.map((code, index) => <code key={`${code}-${index}`} className="font-mono tracking-wide">{code}</code>)
                    ) : (
                        <p className="col-span-full text-sm text-muted-foreground">
                            {processing ? 'Loading codes...' : 'No recovery codes yet.'}
                        </p>
                    )}
                </div>

                <InputError message={errors?.recovery_codes} />

                <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={handleCopyAll} variant="outline" disabled={!codes.length || processing}>
                        <Copy className="mr-2 size-4" />
                        Copy all
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onRegenerate}
                        disabled={processing || !codes.length}
                    >
                        Regenerate
                    </Button>
                </div>

                {copiedText ? <p className="text-xs text-muted-foreground">Copied to clipboard.</p> : null}
            </CardContent>
        </Card>
    );
}
