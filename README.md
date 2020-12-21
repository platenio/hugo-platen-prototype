# hugo-platen

> Platen core theme for Hugo: build websites for digital tabletop rpgs

<!-- TODO: Write the docs! -->

## Using in your hugo site

Add to your `config.yaml`:

```yaml
module:
  imports:
    - path: github.com/platenio/hugo-platen
```

or `config.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/platenio/hugo-platen"
```

then run `hugo mod get -u` and you're done!
