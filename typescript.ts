const lie : boolean = false,
       truth : boolean = true;
       
// The item type, T, followed by brackets means, "an array whose items are of type T."
const divine_lovers : string[] = ["Zeus", "Aphrodite"];

// Writing Array<[Item Type]> means the same thing.
const digits : Array<number> = [143219876, 112347890];

// But this doesn't work. Hm. . . 
const only_strings : string[] = [];
only_strings.push("This Works!")
only_strings.push(42); // This doesn't.


//
function capitalizeName (name : string) : string {
  return name.toUpperCase();
}

// Shoutout to @achm4m0 (Alberto) for notifying me of an error here!
console.log(capitalizeName('geronimo')); // 'GERONIMO'

// But:
console.log(capitalizeName(42)); // Error; 42 isn't a string.

// TypeScript checks at compile-time if you're returning the right type.
function even_broken (num : number) : boolean {
   return (num % 2); // WRONG. This will cause a compile-time error.
}

function even (num : number) : boolean {
   return (num % 2 == 0); // Much better; this works.
}


//
let multiply : (first : number, second : number) => number;
multiply = function (first, second) {
  return first * second;
}
