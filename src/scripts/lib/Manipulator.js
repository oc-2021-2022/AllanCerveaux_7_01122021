/**
 * Manipulator group all function needed to modify DOM
 * @property {HTMLElement | HTMLElement[]} element - HTMLElement selected
 * @property {boolean} elemenHide - set to true if element hide
 * @property {string} elemenHide - store default displayed element
 * @export
 * @class Manipulator
 */
 export class Manipulator {
   constructor() {
    this.element = null
    this.elementHide = false
    this.elementDefaultDisplay = null
   }
   
  /**
   * Select element to manipulate
   *
   * @param {string | HTMLElement} elm
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  selector(elm) {
    if (typeof elm === 'object') {
      this.setElement(elm)
      return this
    }
    else if (elm.includes('.')) {
      this.setElement(document.querySelectorAll(elm))
      return this
    }
    this.setElement(document.querySelector(elm))
    return this
  }

  /**
   * Set element
   *
   * @param {HTMLElemnt} elm
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  setElement (elm) {
    this.element = elm.length < 2 ? elm[0] : elm
    return this
  }

  /**
   * Create new element not work. 
   * @WIP
   * @param {string} tag
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  create (tag) {
    const elm = document.createElement(tag)
    this.element = elm
    return this
  }
  
  /**
   * Set or return text in element
   *
   * @param {string} text optional
   * @return {Manipulator | string} 
   * @memberof Manipulator
   */
  text(text) {
    if(text.length) return this.element.innerText
    this.element.innerText = text
    return this
  }
  /**
   * Set parent to current element
   * @memberof Manipulator
   */
  parent = () => this.setElement(this.element.parentElement)
  
  /**
   * Return childrens of element
   * @memberof Manipulator
   */
  children = () => this.element.children

  /**
   * Loop on element
   *
   * @param {Function} cb
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  each (cb) {
    Array.from(this.element).forEach(elm => cb(elm))
    return this
  }

  /**
   *
   * @param {string} template
   * @return {Manipulator} 
   * @memberof Manipulator
   */
   html(template) {
    this.element.innerHTML = template
    return this
  }
   
  /**
   * Append element
   *
   * @param {HTMLElement | string} elm
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  append (elm) {
    if (typeof elm === 'string') {
      this.element.innerHTML += elm
    } else {
      this.element.append(elm)
    }
    return this
  }

  /**
   * Prepend Element
   *
   * @param {HTMLElement | string} element
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  prepend (element) {
    if (typeof element === 'string') {
      this.element.innerHTML += element
    } else {
      this.element.prepend(element)
    }
    return this
  }

  /**
   * Prepend element before current element
   *
   * @param {string | HTMLElement | HTMLElement[]} element
   * @return {Manipulator} 
   * @memberof Manipulator
   */
   before(element) {
    this.element.before(element)
    return this
  }
  
  /**
   * Prepend element before current element
   *
   * @param {string | HTMLElement | HTMLElement[]} element
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  after (element) {
    this.element.after(element)
    return this
  }

  /**
   * Remove selected element
   *
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  remove () {
    this.element.remove()
    return this
  }

  /**
   * Set default display
   *
   * @param {HTMLElement} element
   * @memberof Manipulator
   */
  defaultDisplay (element) {
    this.elementDefaultDisplay = window.getComputedStyle(element, null).display
  }
   
  /**
   * Hide element with display none
   *
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  hide () {
    const elm = this.element.length < 2 ? this.element[0] : this.element
    this.defaultDisplay(elm)
    elm.style.display = 'none'
    this.elementHide = true
    return this
  }

  /**
   * Show hidden element
   *
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  show () {
    this.element.style.display = this.elementDefaultDisplay
    this.elementHide = false
    return this
  }

  /**
   * Add new id on current element
   *
   * @param {string} id
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  addId (id) {
    this.element.id = id
    return this
  }

  /**
   * Add some class on element
   *
   * @param {string | string[]} arg
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  addClass (...arg) {
    Array.isArray(arg) ? arg.forEach(str => this.element.classList.add(str)) : this.element.classList.add(arg)
    return this
  }

  /**
   * Remove some class on element
   *
   * @param {string | string[]} arg
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  removeClass (...arg) {
    Array.isArray(arg) ? arg.forEach(str => this.element.classList.remove(str)) : this.element.classList.remove(arg)
    return this
  }
  /**
   * Check class exist
   *
   * @param {string} arg
   * @return {boolean} 
   * @memberof Manipulator
   */
  hasClass (arg) {
    return this.element.classList.contains(arg)
  }
  /**
   * Toggle class on element
   *
   * @param {string} arg
   * @memberof Manipulator
   */
  toggleClass (arg) {
    this.element.classList.toggle(arg)
  }

  /**
   * Get attribute on element
   *
   * @param {string} key
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  getAttribute(key) {
    return this.element.getAttribute(key)
  }

  /**
   * Set new attribute on element
   *
   * @param {string} key
   * @param {string} value
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  setAttribute (key, value) {
    this.element.setAttribute(key, value)
    return this
  }
  
  /**
   * Remove attribute on element
   *
   * @param {string} key
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  removeAttribute (key) {
    this.element.removeAttribute(key)
    return this
  }
  /**
   * Check if attribute exist
   *
   * @param {string} key
   * @return {boolean} 
   * @memberof Manipulator
   */
  hasAttribute (key) {
    return this.element.hasAttribute(key)
  }
  /**
   * Add event on element and callback if trigger
   *
   * @param {HTMLElementEventMap} eventName
   * @param {Function} handler
   * @return {Manipulator} 
   * @memberof Manipulator
   */
   on(eventName, handler) {
    if (this.element.length) {
      this.element.forEach(elm => elm.addEventListener(eventName, (event) => handler(event)))
    } else {
      this.element.addEventListener(eventName, (event) => handler(event))
    }
    return this
  }

  /**
   * Add click event on element
   *
   * @param {Function} handler
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  click (handler) {
    this.element.addEventListener('click', (event) => handler(event))
    return this
  }
  
  /**
   * Add focus event on element
   *
   * @param {Function} handler
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  focus (handler) {
    this.element.addEventListener('focus', (event) => handler(event))
    return this
  }

  /**
   * Add hover event on element
   *
   * @param {Function} handler
   * @return {Manipulator} 
   * @memberof Manipulator
   */
  hover (handler) {
    this.element.addEventListener('hover', (event) => handler(event))
    return this
  }
   
  /**
   * Add keydown event on element
   *
   * @param {Function} handler
   * @return {Manipultor} 
   * @memberof Manipulator
   */
  keydown (handler) {
    this.element.addEventListener('keydown', (event) => handler(event))
    return this
  }

  /**
   * Add submit event on element
   *
   * @param {Function} handler
   * @return {Manipultor} 
   * @memberof Manipulator
   */
  submit (handler) {
    this.element.addEventListener('submit', (event) => handler(event))
    return this
  }
  
  /**
   * Set value in input or 
   * Get value if payload id empty
   *
   * @param {string | null} [payload=null]
   * @return {string | null} 
   * @memberof Manipulator
   */
  value(payload = null) {
    if (!this.element.value.length && payload === null) return this.element.value
    this.element.value = payload
    return this
  }
}
