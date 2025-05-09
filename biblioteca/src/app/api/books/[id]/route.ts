import { connectDB } from "@/src/utils/mongoose";
import Books from '@/src/models/Book';
import { NextResponse } from "next/server";

interface Params {
  id: string;
}


export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();


    const book = await Books.findById(params.id);

    if (!book) {
      return NextResponse.json(
        { message: "El libro solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(book);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}


export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    

    const updatedData = await req.json();


    const bookUpdated = await Books.findByIdAndUpdate(params.id, updatedData, { new: true });

    if (!bookUpdated) {
      return NextResponse.json(
        { message: "El libro solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json(bookUpdated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}


export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    

    const deletedBook = await Books.findByIdAndDelete(params.id);

    if (!deletedBook) {
      return NextResponse.json(
        { message: "El libro solicitado no se encuentra" }, {
          status: 404
        }
      );
    }

    return NextResponse.json({ message: "Libro eliminado con éxito" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message }, {
        status: 500
      }
    );
  }
}
