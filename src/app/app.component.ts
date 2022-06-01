import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {School} from "./models/school";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'complex-forms';
  // @ts-ignore
  schoolForm: FormGroup;
  school: School = {
    name: 'CSI',
    emailAddress: 'csischool@gmail.com',
    phoneNumber: '+243900051249',
    address: {
      city: 'Lubumbashi',
      country: 'DR Congo',
      state: 'Haut-Congo',
      street: '416, ave.Stars, Annexe'
    },
    students: [
      {
        name: 'Yves K.',
        emailAddress: 'yvesk@gmail.com',
        phoneNumber: '+24687915741',
        skills: [
          {
            name: 'Kotlin',
            level: 7
          },
          {
            name: 'Js',
            level: 6
          }
        ]
      },
      {
        name: 'Glory K.',
        emailAddress: 'gloryk@gmail.com',
        phoneNumber: '+246879741741',
        skills: [
          {
            name: 'Photoshop',
            level: 7
          },
          {
            name: 'Illustrator',
            level: 6
          }
        ]
      },
    ]
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.schoolForm = this.fb.group({
      name: this.fb.control(''),
      phoneNumber: this.fb.control(''),
      emailAddress: this.fb.control(''),
      address: this.fb.group({
        street: this.fb.control(''),
        city: this.fb.control(''),
        state: this.fb.control(''),
        country: this.fb.control('')
      }),
      students: this.fb.array([])

    });
  }

  patchForm(): void {
    this.schoolForm.patchValue({
      name: this.school.name,
      phoneNumber: this.school.phoneNumber,
      emailAddress: this.school.emailAddress,
      address: this.schoolForm.get('address')?.patchValue(this.school.address)
    });
    this.patchStudents();
  }
  patchStudents(): void {
    this.school.students.map((student) => {

      // A variable to get the list of skills
      const skillsArray: FormArray =this.fb.array([]);

      student.skills.map((skill) => {
        skillsArray.push(this.fb.group(skill));
      });

      // A variable to save the list of skills in a group
      const skillGroup: FormGroup = this.fb.group({
        ...student,
        skills: skillsArray
      });

      this.studentArray().push(skillGroup);
    });
  }

  onSubmit(): void{
    console.log('Form Submit: ', this.schoolForm.value);
  }

  /** students */
  studentArray(): FormArray{
    return this.schoolForm.get('students') as FormArray;
  }

  initStudent(): FormGroup{
    return this.fb.group({
      name: '',
      phoneNumber: '',
      emailAddress: '',
      skills: this.fb.array([]),
    });
  }

  addStudent(): void{
    this.studentArray().push(this.initStudent());
  }

  removeStudent(studentIndex: number): void{
    this.studentArray().removeAt(studentIndex);
  }

  /** skills */
  skillArray(studentIndex: number): FormArray{
    return this.studentArray().at(studentIndex).get('skills') as FormArray;
  }

  initSkill(): FormGroup{
    return this.fb.group({
      name: '',
      level: '',
    });
  }

  addSkill(studentIndex: number): void{
    this.skillArray(studentIndex).push(this.initSkill());
  }

  removeSkill(studentIndex: number, skillIndex: number): void{
    this.skillArray(studentIndex).removeAt(skillIndex);
  }

  clearForm(): void{
    this.schoolForm.reset();
  }
}
