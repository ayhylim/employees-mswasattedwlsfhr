import { Employee } from '@/types/employee';
import { calculateWorkBonus } from '@/utils/bonusCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, Calendar, Mail, MapPin, Phone, Briefcase, User, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EmployeeDetailProps {
  employee: Employee;
  onDelete?: () => void;
}

export const EmployeeDetail = ({ employee, onDelete }: EmployeeDetailProps) => {
  const navigate = useNavigate();
  const workBonus = calculateWorkBonus(employee.joiningYear);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/employee/${employee.id}/edit`)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {employee.name}'s record. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Employee Photo and Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Employee Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={employee.photoUrl} alt={employee.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center mb-2">{employee.name}</h2>
            <p className="text-muted-foreground text-center mb-2">{employee.position}</p>
            <Badge variant={employee.status === 'Permanent' ? 'default' : 'secondary'}>
              {employee.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Complete employee details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">NIK</p>
                    <p className="text-sm">{employee.nik}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                    <p className="text-sm">
                      {new Date(employee.dateOfBirth).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Place of Birth</p>
                    <p className="text-sm">{employee.placeOfBirth}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gender</p>
                    <p className="text-sm">{employee.gender}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Religion</p>
                    <p className="text-sm">{employee.religion}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-sm">{employee.department}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                    <p className="text-sm">{employee.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-sm">{employee.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="text-sm">{employee.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Bonus Card */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              <CardTitle>Work Bonus Information</CardTitle>
            </div>
            <CardDescription>
              6-year service milestone bonus tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee Name</p>
                  <p className="text-lg font-semibold">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Years of Service</p>
                  <p className="text-lg font-semibold">{workBonus.yearsOfService} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Joining Year</p>
                  <p className="text-lg font-semibold">{employee.joiningYear}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bonus Eligibility</p>
                  {workBonus.eligible ? (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" className="bg-success">
                        Eligible for Bonus
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        (Bonus #{workBonus.bonusCount})
                      </span>
                    </div>
                  ) : (
                    <Badge variant="secondary">Not Yet Eligible</Badge>
                  )}
                </div>

                <div className="rounded-lg bg-accent p-4">
                  <p className="text-sm font-medium mb-2">Notes</p>
                  {workBonus.eligible ? (
                    <p className="text-sm text-muted-foreground">
                      🎉 Congratulations! This employee has completed {workBonus.yearsOfService} years of service
                      and is eligible for their {workBonus.bonusCount === 1 ? '1st' : 
                      workBonus.bonusCount === 2 ? '2nd' : 
                      workBonus.bonusCount === 3 ? '3rd' : 
                      `${workBonus.bonusCount}th`} work bonus. 
                      {workBonus.nextBonusIn > 0 && ` Next bonus in ${workBonus.nextBonusIn} years.`}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This employee will be eligible for their first work bonus after completing 6 years of service.
                      Currently at {workBonus.yearsOfService} years. {workBonus.nextBonusIn} more years to go!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
