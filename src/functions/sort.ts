import { Student } from "src/entities/student";

export function mergeSort(arr:Student[]):Student[]{
  if(arr.length <= 1){
      return arr;
  }

  const half:number = Math.floor(arr.length/2);
  const first:Student[] = mergeSort(arr.slice(0,half));
  const second:Student[] = mergeSort(arr.slice(half));

  return merge(first, second);
}

function merge(a:Student[], b:Student[]):Student[]{
  const c:Student[] = [];
  while(a.length && b.length){
      const d=((a[0].attendance*0.3)+(a[0].gpa*0.7));
      const e=((b[0].attendance*0.3)+(b[0].gpa*0.7));
      if(d>e){
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