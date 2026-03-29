export interface PartnerFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationName?: string;
  role?: string;
  country?: string;
  ministryInterests: string[];
  availability: string;
  helpTypes: string[];
  involvementType: string;
  frequency: string;
  backgroundInfo: string;
  comments?: string;
}

export function formatPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
}

export function buildPartnerBrevoPayload(
  submission: PartnerFormSubmission,
  listId: number = 9
) {
  const formattedPhone = formatPhone(submission.phone);
  
  const attributes: Record<string, string | number | boolean> = {
    FIRSTNAME: submission.firstName.trim(),
    LASTNAME: submission.lastName.trim(),
    BACKGROUND_INFO: submission.backgroundInfo.trim(),
    AVAILABILITY: submission.availability.trim(),
    INVOLVEMENT_TYPE: submission.involvementType.trim(),
    FREQUENCY: submission.frequency.trim(),
  };

  if (formattedPhone) attributes.SMS = formattedPhone;
  if (submission.organizationName?.trim()) attributes.ORG_NAME = submission.organizationName.trim();
  if (submission.role?.trim()) attributes.ROLE = submission.role.trim();
  if (submission.country?.trim()) attributes.COUNTRY = submission.country.trim();
  if (submission.ministryInterests.length > 0) attributes.MINISTRY_INTERESTS = submission.ministryInterests.join(", ");
  if (submission.helpTypes.length > 0) attributes.HELP_TYPES = submission.helpTypes.join(", ");
  if (submission.comments?.trim()) attributes.COMMENTS = submission.comments.trim();

  return {
    email: submission.email.trim(),
    attributes,
    listIds: [listId],
    updateEnabled: true,
  };
}
