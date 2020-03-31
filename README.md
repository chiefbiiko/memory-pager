# memory-pager

Access memory using small fixed sized buffers instead of allocating a huge buffer.
Useful if you are implementing sparse data structures (such as large bitfield).

all credit to the original author [mafintosh](https://github.com/mafintosh)

[![ci](https://github.com/chiefbiiko/memory-pager/workflows/ci/badge.svg?branch=master)](https://github.com/chiefbiiko/memory-pager/actions)

## usage

``` ts
import { Pager, Page } from "https://denopkg.com/chiefbiiko/memory-pager@v0.1.0/mod.ts"

const pages: Pager = new Pager(1024); // use 1kb per page

const page: Page = pages.get(10); // get page #10

console.log(page.offset) // 10240
console.log(page.buffer) // a blank 1kb buffer
```

## api

#### `let pages: Pager = new Pager(pageSize: number)`

Create a new pager. `pageSize` defaults to `1024`.

#### `pages.get(pageNumber: number, noAllocate?: boolean): Page`

Get a page. The page will be allocated at first access.

Optionally you can set the `noAllocate` flag which will make the
method return undefined if no page has been allocated already

A page looks like this

``` ts
{
  offset: byteOffset,
  buffer: bufferWithPageSize
}
```

#### `pages.set(pageNumber: number, buffer: Uint8Array): void`

Explicitly set the buffer for a page.

#### `pages.updated(page: Page): void`

Mark a page as updated.

#### `pages.lastUpdate(): Page`

Get the last page that was updated.

#### `pages.toBuffer(): Uint8Array`

Concat all pages allocated pages into a single buffer

## license

[MIT](./LICENSE)