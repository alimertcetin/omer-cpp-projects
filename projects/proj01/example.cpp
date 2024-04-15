#include <iostream>

#define log(x) std::cout << x << std::endl

int main(int argc, char* argv[])
{

  log("Running cpp");
  log("logging passed args:");
    // Print the arguments passed to the program
    for (int i = 0; i < argc; ++i) {
        std::cout << "Argument " << i << ": " << argv[i] << std::endl;
    }
    
  /*
      std::cout << "Hello World!" << std::endl;
  */
    return 0;
}
