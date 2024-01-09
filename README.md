# slidy

Idea about a tool that can display slides on a monitor inside a browser in kiosk mode.

Slides are defined as a sqlite database and can be served statically.

## Development

```
$ nix-shell
$ npm install
$ ninja serve
```

If you make a change, re-run `ninja serve`.

Run `vscode`/`vscodium` and install the recommended extensions for a nice dev experience (required if you want to contribute, because it enables auto-format &c.).
