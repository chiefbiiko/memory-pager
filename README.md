# memory-pager

Access memory using small fixed sized buffers instead of allocating a huge buffer.
Useful if you are implementing sparse data structures (such as large bitfield).

[![Travis](http://img.shields.io/travis/chiefbiiko/memory-pager.svg?style=flat)](http://travis-ci.org/chiefbiiko/memory-pager) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/memory-pager?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/memory-pager)

## Usage

``` ts
import { Pager, Page } from "https://denopkg.com/chiefbiiko/memory-pager/mod.ts"

const pages: Pager = new Pager(1024); // use 1kb per page

const page: Page = pages.get(10); // get page #10

console.log(page.offset) // 10240
console.log(page.buffer) // a blank 1kb buffer
```

## API

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

## License

MIT