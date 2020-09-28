{ pkgs ? import <nixpkgs> { } }:

with pkgs;

let
  unstableTarball = fetchTarball
    "https://github.com/NixOS/nixpkgs-channels/archive/nixos-unstable.tar.gz";

  unstable = import unstableTarball { };

in mkShell {
  buildInputs = with pkgs; [
    # Node
    nodejs-14_x
    nodePackages.npm
    nodePackages.yarn
    nodePackages.prettier
    nodePackages.typescript-language-server

    # Python
    (unstable.python3.withPackages
      (ps: with ps; [ black flake8 mypy python-language-server isort ]))

    # Markdown
    pandoc
  ];
}
