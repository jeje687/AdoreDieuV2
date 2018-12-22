// @flow
import api from "./Api";

/**
 *
 * @export
 * @class ArticlesServices
 */
export default class ArticlesServices {
  static async getThoughts(page: number, itemsPerPage?: number) {
    try {
      const { ok, problem, data } = await api.get(
        `/pensees.php?page=${page}&items_per_page=${itemsPerPage || 10}`
      );
      if (ok) {
        return data;
      }
      throw problem;
    } catch (err) {
      throw err;
    }
  }
}
