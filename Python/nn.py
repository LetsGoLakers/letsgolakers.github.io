import numpy as np

class NeuronLayer():
    def __init__(self,number_of_neurons,number_of_input_per_neuron):
        self.synaptic_weights = 2*np.random.random((number_of_input_per_neuron,number_of_neurons)) -1

class NeuralNetwork():
    def __init__(self,layer1,layer2):
        self.layer1 = layer1
        self.layer2 = layer2


    def __sigmoid(self,x):
        return 1/(1+np.exp(-x))
    def __sigmoid_derivative(self,y):
        return y * (1-y)
    def train(self, training_set_inputs, training_set_outputs, iterations):
        for i in range(0,iterations):
            output_from_layer_1, output_from_layer_2 = self.think(training_set_inputs)
            layer2_error = training_set_outputs - output_from_layer_2
            layer2_delta = layer2_error * self.__sigmoid_derivative(output_from_layer_2)

            layer1_error = layer2_delta.dot(self.layer2.synaptic_weights.T)
            layer1_delta = layer1_error * self.__sigmoid_derivative(output_from_layer_1)

            layer1_adjustment = training_set_inputs.T.dot(layer1_delta)
            layer2_adjustment = output_from_layer_1.T.dot(layer2_delta)


            self.layer1.synaptic_weights += layer1_adjustment
            self.layer2.synaptic_weights += layer2_adjustment
    def think(self,inputs):
        output_from_layer1 = self.__sigmoid(np.dot(inputs, self.layer1.synaptic_weights))
        output_from_layer2 = self.__sigmoid(np.dot(output_from_layer1, self.layer2.synaptic_weights))
        return output_from_layer1, output_from_layer2

    def print_weights(self):
        print ("    Layer 1: ")
        print (self.layer1.synaptic_weights)
        print ("    Layer 2: ")
        print (self.layer2.synaptic_weights)

if __name__ == "__main__":

    np.random.seed(1)

    layer1 = NeuronLayer(4, 3)

    layer2 = NeuronLayer(1, 4)

    neural_network = NeuralNetwork(layer1, layer2)

    print ("Stage 1) Random starting synaptic weights: ")
    neural_network.print_weights()


    training_set_inputs = np.array([[1, 1, 1],[2,0,0],[2,0,1],[2,1,0],[1,2,0],[1,0,2],[.5,1,0],[1,.5,0],[0,.5,0],[0.5,0,0],[0, 0, 1], [0, 1, 1], [1, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1], [0,0,0], [0, 0, 0],[1,1.5,0], [1,1,0]])
    training_set_outputs = np.array([[1,.667,1,1,1,1,0.5,0.5,0.1667,0.1667,.333,.667, .667,.333, .333, 1,0, 0,0.8333,.667]]).T


    neural_network.train(training_set_inputs, training_set_outputs, 100000)

    print ("Stage 2) New synaptic weights after training: ")
    neural_network.print_weights()
    inp = input("Enter numbers: ")

    while inp is not "quit":
        numbers = [float(s) for s in inp.split(",")]
        actual = sum(numbers)/3
        hidden_state, output = neural_network.think(np.array(numbers))
        print ("Prediction: " + str(output) + " Actual: " + str(actual))
        inp = input("Enter numbers: ")
