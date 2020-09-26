{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = with pkgs; [
    nodejs-13_x
    nodePackages.npm
    nodePackages.yarn
    nodePackages.prettier
    nodePackages.typescript-language-server
  ];
}
