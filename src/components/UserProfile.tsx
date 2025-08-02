import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface UserProfileProps {
  profile: {
    age: string;
    gender: string;
    occupation: string;
  };
  onProfileChange: (profile: { age: string; gender: string; occupation: string }) => void;
}

export function UserProfile({ profile, onProfileChange }: UserProfileProps) {
  const updateProfile = (field: string, value: string) => {
    const newProfile = { ...profile, [field]: value };
    onProfileChange(newProfile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Personal Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age Group
            </Label>
            <Select value={profile.age} onValueChange={(value) => updateProfile("age", value)}>
              <SelectTrigger data-testid="select-age">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-34">25-34</SelectItem>
                <SelectItem value="35-44">35-44</SelectItem>
                <SelectItem value="45-54">45-54</SelectItem>
                <SelectItem value="55+">55+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </Label>
            <Select value={profile.gender} onValueChange={(value) => updateProfile("gender", value)}>
              <SelectTrigger data-testid="select-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
              Occupation
            </Label>
            <Select value={profile.occupation} onValueChange={(value) => updateProfile("occupation", value)}>
              <SelectTrigger data-testid="select-occupation">
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Developer">Software Developer</SelectItem>
                <SelectItem value="Healthcare Worker">Healthcare Worker</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="Construction Worker">Construction Worker</SelectItem>
                <SelectItem value="Farmer">Farmer</SelectItem>
                <SelectItem value="Office Worker">Office Worker</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
