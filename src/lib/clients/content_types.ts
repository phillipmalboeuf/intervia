import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    sousTitre?: EntryFieldTypes.RichText;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export interface TypeLienFields {
    titre?: EntryFieldTypes.Symbol;
    route?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
}

export type TypeLienSkeleton = EntrySkeletonType<TypeLienFields, "lien">;
export type TypeLien<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLienSkeleton, Modifiers, Locales>;

export interface TypeListeFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    layout?: EntryFieldTypes.Symbol<"Cartes" | "Slider">;
    couleur?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Yellow">;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjetSkeleton | TypeServiceSkeleton | TypeTextSkeleton>>;
}

export type TypeListeSkeleton = EntrySkeletonType<TypeListeFields, "liste">;
export type TypeListe<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeListeSkeleton, Modifiers, Locales>;

export interface TypeNavigationFields {
    id?: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeHeroSkeleton | TypeListeSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

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
    description?: EntryFieldTypes.RichText;
    sousServices?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeServiceSkeleton>>;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, "service">;
export type TypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeServiceSkeleton, Modifiers, Locales>;

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    sansTitre?: EntryFieldTypes.Boolean;
    id?: EntryFieldTypes.Symbol;
    layout?: EntryFieldTypes.Symbol<"Centre" | "Droite" | "Tableau">;
    media?: EntryFieldTypes.AssetLink;
    couleur?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Yellow">;
    corps?: EntryFieldTypes.RichText;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;
