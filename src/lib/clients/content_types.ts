import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProjetFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    vedette?: EntryFieldTypes.Boolean;
    client?: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    status?: EntryFieldTypes.Symbol;
    services?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeServiceSkeleton>>;
    thumbnail?: EntryFieldTypes.AssetLink;
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    mandat?: EntryFieldTypes.RichText;
    contexte?: EntryFieldTypes.RichText;
    solution?: EntryFieldTypes.RichText;
}

export type TypeProjetSkeleton = EntrySkeletonType<TypeProjetFields, "projet">;
export type TypeProjet<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjetSkeleton, Modifiers, Locales>;

export interface TypeServiceFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    illustration?: EntryFieldTypes.AssetLink;
    sousServices?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeServiceSkeleton>>;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, "service">;
export type TypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeServiceSkeleton, Modifiers, Locales>;
