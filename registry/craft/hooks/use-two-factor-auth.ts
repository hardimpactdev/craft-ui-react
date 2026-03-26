import { useState, useCallback, useMemo } from 'react';

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
};

export function useTwoFactorAuth() {
    const [errors, setErrors] = useState<string[]>([]);
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);

    const hasSetupData = useMemo(
        () => qrCodeSvg !== null && manualSetupKey !== null,
        [qrCodeSvg, manualSetupKey],
    );

    const clearErrors = useCallback(() => setErrors([]), []);

    const clearSetupData = useCallback(() => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
    }, []);

    const clearTwoFactorAuthData = useCallback(() => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
        setRecoveryCodesList([]);
    }, []);

    const fetchQrCode = useCallback(async () => {
        try {
            const { svg } = await fetchJson<{ svg: string; url: string }>(
                '/user/two-factor-qr-code',
            );
            setQrCodeSvg(svg);
        } catch {
            setErrors((prev) => [...prev, 'Failed to fetch QR code']);
            setQrCodeSvg(null);
        }
    }, []);

    const fetchSetupKey = useCallback(async () => {
        try {
            const { secretKey: key } = await fetchJson<{ secretKey: string }>(
                '/user/two-factor-secret-key',
            );
            setManualSetupKey(key);
        } catch {
            setErrors((prev) => [...prev, 'Failed to fetch a setup key']);
            setManualSetupKey(null);
        }
    }, []);

    const fetchRecoveryCodes = useCallback(async () => {
        try {
            setErrors([]);
            const codes = await fetchJson<string[]>(
                '/user/two-factor-recovery-codes',
            );
            setRecoveryCodesList(codes);
        } catch {
            setErrors((prev) => [...prev, 'Failed to fetch recovery codes']);
            setRecoveryCodesList([]);
        }
    }, []);

    const fetchSetupData = useCallback(async () => {
        try {
            setErrors([]);
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch {
            setQrCodeSvg(null);
            setManualSetupKey(null);
        }
    }, [fetchQrCode, fetchSetupKey]);

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        errors,
        hasSetupData,
        clearSetupData,
        clearErrors,
        clearTwoFactorAuthData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
}
