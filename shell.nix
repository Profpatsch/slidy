{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.python3
    pkgs.ninja
    pkgs.execline
    pkgs.graphviz
    pkgs.sqlite
    # pkgs.datasette
  ];

}
