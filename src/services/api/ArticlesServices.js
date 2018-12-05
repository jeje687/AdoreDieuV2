//@flow
import { api } from "./Api";

/**
 *
 * @export
 * @class ArticlesServices
 */
export default class ArticlesServices {
  static async getThoughts(page: number, itemsPerPage?: number) {
    try {
      let { ok, problem, data } = await api.get(
        `/pensees.php?page=${page}&items_per_page=${
          itemsPerPage ? itemsPerPage : 10
        }`
      );
      debugger;
      if (ok) {
        return data;
      } else {
        console.error(problem);
        throw problem;
      }
    } catch (err) {
      throw err;
    }
  }
}
