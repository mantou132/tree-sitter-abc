import XCTest
import SwiftTreeSitter
import TreeSitterAbc

final class TreeSitterAbcTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_abc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Abc grammar")
    }
}
