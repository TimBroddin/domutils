import type { Node, Element } from "domhandler";

/**
 * Remove an element from the dom
 *
 * @param elem The element to be removed
 */
export function removeElement(elem: Node): void {
    if (elem.prev) elem.prev.next = elem.next;
    if (elem.next) elem.next.prev = elem.prev;

    if (elem.parent) {
        const childs = elem.parent.children;
        childs.splice(childs.lastIndexOf(elem), 1);
    }
}

/**
 * Replace an element in the dom
 *
 * @param elem The element to be replaced
 * @param replacement The element to be added
 */
export function replaceElement(elem: Node, replacement: Node): void {
    const prev = (replacement.prev = elem.prev);
    if (prev) {
        prev.next = replacement;
    }

    const next = (replacement.next = elem.next);
    if (next) {
        next.prev = replacement;
    }

    const parent = (replacement.parent = elem.parent);
    if (parent) {
        const childs = parent.children;
        childs[childs.lastIndexOf(elem)] = replacement;
    }
}

/**
 * Append a child to an element.
 *
 * @param elem The element to append to.
 * @param child The element to be added as a child.
 */
export function appendChild(elem: Element, child: Node): void {
    removeElement(child);

    child.next = null;
    child.parent = elem;

    if (elem.children.push(child) > 1) {
        const sibling = elem.children[elem.children.length - 2];
        sibling.next = child;
        child.prev = sibling;
    } else {
        child.prev = null;
    }
}

/**
 * Append an element after another.
 *
 * @param elem The element to append after.
 * @param next The element be added.
 */
export function append(elem: Node, next: Node): void {
    removeElement(next);

    const { parent } = elem;
    const currNext = elem.next;

    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;

    if (currNext) {
        currNext.prev = next;
        if (parent) {
            const childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
        }
    } else if (parent) {
        parent.children.push(next);
    }
}

/**
 * Prepend a child to an element.
 *
 * @param elem The element to prepend before.
 * @param child The element to be added as a child.
 */
export function prependChild(elem: Element, child: Node): void {
    removeElement(child);

    child.parent = elem;
    child.prev = null;

    if (elem.children.unshift(child) !== 1) {
        const sibling = elem.children[1];
        sibling.prev = child;
        child.next = sibling;
    } else {
        child.next = null;
    }
}

/**
 * Prepend an element before another.
 *
 * @param elem The element to prepend before.
 * @param prev The element be added.
 */
export function prepend(elem: Node, prev: Node): void {
    removeElement(prev);

    const { parent } = elem;
    if (parent) {
        const childs = parent.children;
        childs.splice(childs.indexOf(elem), 0, prev);
    }

    if (elem.prev) {
        elem.prev.next = prev;
    }

    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
}
