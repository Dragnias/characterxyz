import { Student } from "src/entities/student";
//mergeSortFM function is used to sort the student records on the basis of weightedScore
export function mergeSortFM(arr:Student[]):Student[]{
  if(arr.length <= 1){
      return arr;
  }
  //Math.floor is used to do floor division 
  const half:number = Math.floor(arr.length/2);
  //the arr.slice splits the array into parts
  const first:Student[] = mergeSortFM(arr.slice(0,half));
  const second:Student[] = mergeSortFM(arr.slice(half));

  return merge(first, second);
}

function merge(a:Student[], b:Student[]):Student[]{
  const c:Student[] = [];
  while(a.length && b.length){
      //the elements of the record which is now in object format can be accessed by.fieldName
      const d=((a[0].attendance*0.3)+(a[0].gpa*0.7));
      const e=((b[0].attendance*0.3)+(b[0].gpa*0.7));
      if(d>e){
          //the .push method is used to insert elements at the end of an array
          c.push(a.shift()!);
      }else{
          c.push(b.shift()!);
      }
  }

  while(a.length){
      c.push(a.shift()!);
  }

  while(b.length){
      c.push(b.shift()!);
  }

  return c;
}
//mergeSortRD function is used to sort student records on basis of their registrationDate
export function mergeSortRD(arr:Student[]):Student[]{
  if(arr.length <= 1){
      return arr;
  }

  const half:number = Math.floor(arr.length/2);
  const first:Student[] = mergeSortRD(arr.slice(0,half));
  const second:Student[] = mergeSortRD(arr.slice(half));

  return merge1(first, second);
}

function merge1(a:Student[], b:Student[]):Student[]{
  const c:Student[] = [];
  while(a.length && b.length){
      const d=a[0].registration_date;
      const e=b[0].registration_date;
      if(d<e){
          c.push(a.shift()!);
      }else{
          c.push(b.shift()!);
      }
  }

  while(a.length){
      c.push(a.shift()!);
  }

  while(b.length){
      c.push(b.shift()!);
  }

  return c;
}
