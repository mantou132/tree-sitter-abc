package tree_sitter_abc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_abc "github.com/tree-sitter/tree-sitter-abc/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_abc.Language())
	if language == nil {
		t.Errorf("Error loading Abc grammar")
	}
}
