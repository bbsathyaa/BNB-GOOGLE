import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Edit, Trash2 } from "lucide-react";

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onEdit?: (contact: EmergencyContact) => void;
  onDelete?: (id: string) => void;
}

export default function EmergencyContactCard({ 
  contact, 
  onEdit, 
  onDelete 
}: EmergencyContactCardProps) {
  const initials = contact.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="hover-elevate" data-testid={`card-contact-${contact.id}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate" data-testid={`text-name-${contact.id}`}>
              {contact.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span data-testid={`text-phone-${contact.id}`}>{contact.phone}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1" data-testid={`text-relationship-${contact.id}`}>
              {contact.relationship}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit?.(contact)}
              data-testid={`button-edit-${contact.id}`}
            >
              <Edit className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete?.(contact.id)}
              data-testid={`button-delete-${contact.id}`}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
