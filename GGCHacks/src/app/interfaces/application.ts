export class Application {

  gender: string;
  ethnicity: string;
  preferredPronouns: string;
  dietaryRestrictions: string;
  phone: number;
  major: string;
  college: string;
  expectedGraduationDate: string;
  whyAttend: string;
  whatDoYouWantToLearn: string;
  linkedIn: string;
  gitHub: string;
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactRelationWithApplicant: string;
  emCPhoneNumber: number;
  agreedToCodeOfConduct: boolean;
  submitted: boolean;
  hack: string;

  constructor() {
    this.gender = '';
    this.ethnicity = '';
    this.preferredPronouns = '';
    this.dietaryRestrictions = '';
    this.phone = null;
    this.major = '';
    this.college = 'GGC';
    this.expectedGraduationDate = '';
    this.whyAttend = '';
    this.whatDoYouWantToLearn = '';
    this.linkedIn = '';
    this.gitHub = '';
    this.emergencyContactFirstName = '';
    this.emergencyContactLastName = '';
    this.emergencyContactRelationWithApplicant = '';
    this.emCPhoneNumber = null;
    this.agreedToCodeOfConduct = false;
    this.submitted = false;
    this.hack = 'Grizzly Hacks 2020';
  }



}
