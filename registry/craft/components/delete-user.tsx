import { useState } from 'react';
import { OctagonAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeleteUserProps {
    errors?: { password?: string };
    processing?: boolean;
    onDelete?: (password: string) => void;
}

export default function DeleteUser({ errors = {}, processing = false, onDelete }: DeleteUserProps) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onDelete?.(password);
        setOpen(false);
    };

    return (
        <section className="rounded-xl border border-destructive/20 p-4">
            <Heading title="Delete Account" description="Remove your account and all associated data." variant="small" />

            <p className="mt-3 text-sm text-muted-foreground">
                Once your account is deleted, all of its resources and data will be permanently
                removed. Please proceed with caution.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive" className="mt-4">
                        Delete account
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="inline-flex items-center gap-2">
                            <OctagonAlert className="size-4" />
                            Delete account
                        </DialogTitle>
                        <DialogDescription>
                            Confirm by entering your password. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="delete-password">Password</Label>
                            <Input
                                id="delete-password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                placeholder="Current password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="destructive" disabled={processing}>
                                Confirm delete
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
