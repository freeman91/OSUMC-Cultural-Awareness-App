import { Api } from "./api";

/**
 * Represents a GeneralInsight used by {@link Culture}.
 *
 * fields:
 *   source: string
 *   text: string
 */
export type GeneralInsight = {
  source: string;
  text: string;
};

/**
 * Represents a SpecializedInsight used by {@link Culture}.
 * A Map<string, GeneralInsight>.
 */
export type SpecializedInsight = Map<string, GeneralInsight[]>;

/**
 * A Wrapper around {@link Api} for Culture.
 */
export class Culture {
  /**
   * constructor for {@link Culture}.
   *
   * @param {string} name
   * @param {string[]} generalInsights
   * @param {string[]} specializedInsights
   */
  constructor(
    public name: string,
    public generalInsights: GeneralInsight[],
    public specializedInsights: SpecializedInsight
  ) {}

  /**
   * Get information about a {@link Culture}.
   *
   * @param {string} name
   * @returns {Promise<Culture>}
   */
<<<<<<< HEAD
  static async get(name: string): Promise<Culture> {
    let json = await Api.get(`/culture/${name}`);
=======
  static async detailed(name: string): Promise<Culture> {
    let json = await Api.get(`/culture/${escape(name)}/all`);
>>>>>>> origin/culture-view

    return new this(
      json["name"],
      json["general_insights"],
      json["specialized_insights"]
    );
  }

  /**
<<<<<<< HEAD
   * Snapshot information about a {@link Culture}.
   *
   * @param {string} name
   * @returns {Promise<Culture>}
   */
  static async snapshot(name: string): Promise<Culture> {
<<<<<<< HEAD
    let json = Api.get(`/culture/${name}`);
=======
    let json = await Api.get(`/culture/${escape(name)}`);
>>>>>>> origin/culture-view

    return new this(json["name"], json["general_insights"]);
  }

  /**
   * List all cultures by name.
   *
   * @returns {Promise<{ name: string; modified: number }[]>}
   */
<<<<<<< HEAD
  static async list(): Promise<{ name: string; modified: number }[]> {
=======
  static async List(): Promise<string[]> {
>>>>>>> origin/culture-view
    let json = await Api.get("/culture");

    return json["cultures"];
  }

  /**
   * Create a {@link Culture}
   *
   * @param {string} token
   * @returns {Promise<void>}
   */
  async create(token: string): Promise<void> {
    Api.post(
      "/culture",
      {
        name: this.name,
        general_insights: this.generalInsights,
        specialized_insights: this.specializedInsights,
      },
      token
    );
  }

  /**
   * Delete a {@link Culture}
   *
   * @param {string} token
   * @returns {Promise<void>}
   */
  async delete(token: string): Promise<void> {
<<<<<<< HEAD
    Api.delete(`/culture/${this.name}`, token);
=======
    Api.delete(`/culture/${escape(this.name)}`, token);
>>>>>>> origin/culture-view
  }

  /**
   * Update a {@link Culture}
   *
   * @param {string} token
   * @returns {Promise<void>}
   */
  async update(token: string): Promise<void> {
<<<<<<< HEAD
    Api.put(`/culture/${this.name}`, this, token);
=======
    Api.put(`/culture/${escape(this.name)}`, this, token);
>>>>>>> origin/culture-view
  }
}
