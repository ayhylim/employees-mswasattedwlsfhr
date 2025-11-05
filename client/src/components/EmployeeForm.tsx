import {useState} from "react";
import {Employee} from "@/types/employee";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {ArrowLeft, Save, Upload} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {toast} from "@/hooks/use-toast";
import pako from "pako";

interface EmployeeFormProps {
    employee?: Employee;
    onSubmit: (employee: Omit<Employee, "id">) => Promise<void>;
}

export const EmployeeForm = ({employee, onSubmit}: EmployeeFormProps) => {
    const navigate = useNavigate();
    const [photoPreview, setPhotoPreview] = useState<string | undefined>(employee?.photoUrl);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: employee?.name || "",
        nik: employee?.nik || "",
        position: employee?.position || "",
        status: employee?.status || "Contract",
        joiningYear: employee?.joiningYear || new Date().getFullYear(),
        dateOfBirth: employee?.dateOfBirth || "",
        placeOfBirth: employee?.placeOfBirth || "",
        religion: employee?.religion || "",
        gender: employee?.gender || "Male",
        department: employee?.department || "",
        address: employee?.address || "",
        phoneNumber: employee?.phoneNumber || "",
        email: employee?.email || "",
        photoUrl: employee?.photoUrl || ""
    });

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedBase64 = await compressImage(file);
                setPhotoPreview(compressedBase64);
                handleChange("photoUrl", compressedBase64);
            } catch (error) {
                console.error("Error compressing image:", error);
                toast({
                    title: "Error",
                    description: "Failed to process image",
                    variant: "destructive"
                });
            }
        }
    };

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    const maxWidth = 500;
                    const maxHeight = 500;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                    resolve(compressedBase64);
                };
                img.onerror = () => reject(new Error("Failed to load image"));
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ FIXED: Validation
        if (!formData.name || !formData.nik || !formData.email) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields (Name, NIK, Email)",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // ✅ FIXED: Wait untuk API request selesai
            await onSubmit(formData);
            // Success toast sudah di-handle di parent component
        } catch (error) {
            console.error("Form submission error:", error);
            // Error toast juga sudah di-handle di parent component
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to List
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>{employee ? "Edit Employee" : "Add New Employee"}</CardTitle>
                    <CardDescription>
                        {employee ? "Update employee information" : "Enter employee information below"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Photo Upload */}
                        <div className="space-y-2">
                            <Label>Employee Photo</Label>
                            <div className="flex items-center gap-4">
                                {photoPreview && (
                                    <img
                                        src={photoPreview}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-full object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="cursor-pointer"
                                        disabled={isSubmitting}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Upload employee photo (optional)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Basic Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={e => handleChange("name", e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nik">NIK *</Label>
                                    <Input
                                        id="nik"
                                        value={formData.nik}
                                        onChange={e => handleChange("nik", e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={e => handleChange("position", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Employment Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={value => handleChange("status", value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Permanent">Permanent</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="joiningYear">Joining Year</Label>
                                    <Input
                                        id="joiningYear"
                                        type="number"
                                        value={formData.joiningYear}
                                        onChange={e => handleChange("joiningYear", parseInt(e.target.value))}
                                        min="1980"
                                        max={new Date().getFullYear()}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        value={formData.department}
                                        onChange={e => handleChange("department", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={e => handleChange("dateOfBirth", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="placeOfBirth">Place of Birth</Label>
                                    <Input
                                        id="placeOfBirth"
                                        value={formData.placeOfBirth}
                                        onChange={e => handleChange("placeOfBirth", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={value => handleChange("gender", value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="religion">Religion</Label>
                                    <Select
                                        value={formData.religion}
                                        onValueChange={value => handleChange("religion", value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select religion" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Islam">Islam</SelectItem>
                                            <SelectItem value="Christian">Christian</SelectItem>
                                            <SelectItem value="Catholic">Catholic</SelectItem>
                                            <SelectItem value="Hindu">Hindu</SelectItem>
                                            <SelectItem value="Buddha">Buddha</SelectItem>
                                            <SelectItem value="Confucianism">Confucianism</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={e => handleChange("email", e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={e => handleChange("phoneNumber", e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={formData.address}
                                        onChange={e => handleChange("address", e.target.value)}
                                        rows={3}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/dashboard")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="gap-2" disabled={isSubmitting}>
                                <Save className="h-4 w-4" />
                                {isSubmitting ? "Saving..." : employee ? "Update Employee" : "Add Employee"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
