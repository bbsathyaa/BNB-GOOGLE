import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EmergencyContact } from "./EmergencyContactCard";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<EmergencyContact, 'id'>) => void;
  editContact?: EmergencyContact;
}

export default function AddContactDialog({
  open,
  onOpenChange,
  onSave,
  editContact
}: AddContactDialogProps) {
  const [name, setName] = useState(editContact?.name || '');
  const [phone, setPhone] = useState(editContact?.phone || '');
  const [relationship, setRelationship] = useState(editContact?.relationship || '');

  const handleSave = () => {
    if (name && phone && relationship) {
      onSave({ name, phone, relationship });
      setName('');
      setPhone('');
      setRelationship('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-add-contact">
        <DialogHeader>
          <DialogTitle>{editContact ? 'Edit Contact' : 'Add Emergency Contact'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-testid="input-phone"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Input
              id="relationship"
              placeholder="e.g., Mother, Friend, Colleague"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              data-testid="input-relationship"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name || !phone || !relationship}
            data-testid="button-save"
          >
            {editContact ? 'Update' : 'Add'} Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
