import { PropertyForm } from "@/features/admin/components/PropertyForm";
import { getPropertyById } from "@/api/properties.api";
import { notFound } from "next/navigation";

interface EditPropertyPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        return notFound();
    }

    return <PropertyForm initialData={property} isEdit={true} />;
}
