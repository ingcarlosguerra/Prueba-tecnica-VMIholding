
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/utils/mongoose';
import Book from '@/src/models/Book';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export async function GET(){
  connectDB()
  const books = await Book.find()
  return NextResponse.json(
      books
  );
}


export async function POST(req:any){

  try {
    const data = await req.json();
    const newBooks = new Book(data)
    const savedBook = await newBooks.save()
    console.log(data);
    return NextResponse.json(savedBook);
    
  } catch (error:any) {
    return NextResponse.json(error.message,{
      status:400
    })
    console.log(error)
  }

}