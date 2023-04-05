import axios from 'axios';
import type BookModel from '@/model/bookModel';

export class BookService {
    private static apiPath = 'http://localhost:3000/books/';

    static async createBook(book: BookModel): Promise<{status: number, newId: number | undefined}> {
        const response = await axios.post(this.apiPath, book);
        if (response.status === 201) {
            return {status: response.status, newId: response.data.id};
        } else {
            return {status: response.status, newId: undefined};
        }
    }
    static async getBooks(): Promise<[BookModel]> {
        const response = await axios.get(this.apiPath);
        return await response.data
    }

    static async searchBooks(term: string): Promise<[BookModel]> {
        const response = await axios.get(this.apiPath + "search", {params: {
                q: term
            }});
        return response.data
    }

    static async getBookById(id: number): Promise<BookModel> {
        const response = await axios.get(this.apiPath + id);
        return response.data;
    }

    static async updateBook(book: BookModel): Promise<number> {
        const response = await axios.post(this.apiPath + book.id, book);
        return response.status;
    }

    static async deleteBook(id: number): Promise<number> {
        const response = await axios.delete(this.apiPath + id);
        return response.status;
    }
}
