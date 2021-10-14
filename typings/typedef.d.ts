type PersistFn = (callback: Function, refresh?: boolean, name?: string) => any;
type Persist = PersistFn & Options;
/**
 * Creates new instance of persistable
 */
type Persistable = (options?: Partial<Options>) => Persist;
type Options = {
    /**
     * location to save persisted return values
     */
    outputDir?: string;
    /**
     * inline JSON objects
     */
    minify?: boolean;
};
