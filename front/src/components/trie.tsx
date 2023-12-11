import React from "react";

interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
}

const buildTrie = (words: string[]): TrieNode => {
  const root: TrieNode = { children: {}, isEndOfWord: false };

  for (const word of words) {
    let node = root;
    const lowercasedWord = word.toLowerCase(); // Convert the word to lowercase
    for (const char of lowercasedWord) {
      if (!node.children[char]) {
        node.children[char] = { children: {}, isEndOfWord: false };
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  return root;
};

const findSuggestions = (trie: TrieNode, prefix: string): string[] => {
  let node = trie;
  let lowercasedPrefix = prefix.toLowerCase();
  for (const char of lowercasedPrefix) {
    if (!node.children[char]) {
      return [];
    }
    node = node.children[char];
  }

  const suggestions: string[] = [];
  collectSuggestions(node, prefix, suggestions);

  return suggestions;
};

const collectSuggestions = (
  node: TrieNode,
  currentPrefix: string,
  suggestions: string[]
): void => {
  if (node.isEndOfWord) {
    suggestions.push(currentPrefix);
  }

  for (const char in node.children) {
    collectSuggestions(node.children[char], currentPrefix + char, suggestions);
  }
};

export { buildTrie, findSuggestions, collectSuggestions };
