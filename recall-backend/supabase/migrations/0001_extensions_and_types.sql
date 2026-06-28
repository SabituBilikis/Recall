-- Extensions + enums. Foundation for every later migration.

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "moddatetime" schema extensions; -- updated_at trigger

-- Item kinds. Mirrors the app's SavedItemType.
create type public.saved_item_type as enum ('screenshot', 'link', 'note', 'file');

-- Collection appearance. Mirrors CollectionColor / CollectionIcon.
create type public.collection_color as enum ('purple', 'blue', 'grey', 'green', 'yellow', 'red');
create type public.collection_icon as enum ('folder', 'briefcase', 'folderOpen', 'tray', 'book', 'bookmark');
